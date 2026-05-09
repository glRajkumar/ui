# Base UI Reference

Package: `@base-ui/react` (previously `@base-ui-components/react` — always use new name)

## How to fetch docs

Append `.md` to any Base UI URL to get raw markdown:

```
https://base-ui.com/react/handbook/composition      → page
https://base-ui.com/react/handbook/composition.md   → raw markdown ✓

https://base-ui.com/react/components/alert-dialog      → page
https://base-ui.com/react/components/alert-dialog.md   → raw markdown ✓

https://base-ui.com/llms.txt       → full index of all docs + URLs
https://base-ui.com/llms-full.txt  → everything in one file
```

Use this when working on a component: fetch `https://base-ui.com/react/components/<name>.md` for full API reference.

---

## Handbook URLs

| Topic | URL |
|-------|-----|
| Styling | https://base-ui.com/react/handbook/styling.md |
| Animation | https://base-ui.com/react/handbook/animation.md |
| Composition | https://base-ui.com/react/handbook/composition.md |
| Customization | https://base-ui.com/react/handbook/customization.md |
| Forms | https://base-ui.com/react/handbook/forms.md |
| TypeScript | https://base-ui.com/react/handbook/typescript.md |

---

## Setup — Stacking context (why z-index / z-50 not needed)

Base UI portals popups (Dialog, Popover, Menu, Tooltip). Add `isolation: isolate` on app root so portals always render above content — no `z-index` needed on individual components:

```tsx
// layout.tsx
<body>
  <div className="root">{children}</div>
</body>
```

```css
/* styles.css */
.root { isolation: isolate; }
```

### iOS 26+ Safari (backdrop fix)

Backdrops must use `position: absolute` not `position: fixed`. Required global style:

```css
body { position: relative; }
```

Tailwind: add `supports-[-webkit-touch-callout:none]:absolute` on backdrop elements.

---

## Styling

### className — string or state function

```tsx
<Switch.Thumb className="my-thumb" />
<Switch.Thumb className={(state) => state.checked ? 'checked' : 'unchecked'} />
```

### Data attributes — CSS state selectors

```css
[data-checked] { background: green; }
[data-open] { opacity: 1; }
[data-disabled] { opacity: 0.5; }
[data-highlighted] { background: blue; }
```

### CSS variables — dynamic values from component

```css
.popup {
  max-height: var(--available-height);
  width: var(--anchor-width);
  transform-origin: var(--transform-origin);
}
```

### style prop — object or state function

```tsx
<Slider.Thumb style={(state) => ({ left: `${state.percentages[0]}%` })} />
```

---

## Animation

### CSS Transitions (preferred — smoothly cancellable)

Use `data-starting-style` (initial) and `data-ending-style` (final):

```css
.popup {
  transition: transform 150ms, opacity 150ms;
}
.popup[data-starting-style],
.popup[data-ending-style] {
  opacity: 0;
  transform: scale(0.9);
}
```

Tailwind:
```
transition-all duration-150
data-[starting-style]:opacity-0 data-[starting-style]:scale-90
data-[ending-style]:opacity-0 data-[ending-style]:scale-90
```

### CSS Animations (keyframes)

Use `data-open` / `data-closed`:

```css
.popup[data-open]   { animation: scaleIn 150ms ease-out; }
.popup[data-closed] { animation: scaleOut 150ms ease-in; }
```

### JavaScript animations (Motion library)

**Components unmounted when closed** (Dialog, Popover, Tooltip, Menu):
- Control with `open` prop so `<AnimatePresence>` sees state
- Set `keepMounted` on `<Portal>`
- Use `render` prop with `motion.div`

```tsx
<Popover.Root open={open} onOpenChange={setOpen}>
  <AnimatePresence>
    {open && (
      <Popover.Portal keepMounted>
        <Popover.Positioner>
          <Popover.Popup
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              />
            }
          >
            Popup
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    )}
  </AnimatePresence>
</Popover.Root>
```

**Components kept in DOM when closed** (`keepMounted`):
- Use `render` prop with `motion.div`
- Animate based on `open` state — no `<AnimatePresence>`

```tsx
<Popover.Popup
  render={(props, state) => (
    <motion.div
      {...(props as HTMLMotionProps<'div'>)}
      initial={false}
      animate={{ opacity: state.open ? 1 : 0, scale: state.open ? 1 : 0.8 }}
    />
  )}
/>
```

**Manual unmount** (full control via `actionsRef`):

```tsx
const actionsRef = React.useRef(null)

<Popover.Root open={open} onOpenChange={setOpen} actionsRef={actionsRef}>
  <Popover.Popup
    render={
      <motion.div
        exit={{ scale: 0 }}
        onAnimationComplete={() => {
          if (!open) actionsRef.current.unmount()
        }}
      />
    }
  />
</Popover.Root>
```

> Base UI detects animations via `element.getAnimations()`. If `opacity` isn't part of your animation, animate it to `0.9999` so Base UI can detect completion.

---

## Composition — `render` prop

**This is Base UI's equivalent of `asChild`. No `asChild` prop exists.**

### Compose with your own component

```tsx
<Menu.Trigger render={<MyButton size="md" />}>
  Open menu
</Menu.Trigger>
```

> Custom component MUST: **forward `ref`** + **spread all received props** on the DOM node.

```tsx
const MyButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ children, ...props }, ref) => (
    <button ref={ref} {...props}>{children}</button>
  )
)
```

### Replace rendered element

```tsx
// Menu.Item renders <div> by default — render as <a> instead
<Menu.Item render={<a href="/home" />}>
  Home
</Menu.Item>
```

### Render function (state-aware, performance-sensitive)

```tsx
<Switch.Thumb
  render={(props, state) => (
    <span {...props}>
      {state.checked ? <CheckIcon /> : <XIcon />}
    </span>
  )}
/>
```

### Nested composition

```tsx
<Tooltip.Trigger
  render={
    <Dialog.Trigger
      render={<Menu.Trigger render={<MyButton />}>Open</Menu.Trigger>}
    />
  }
/>
```

### `nativeButton` prop

Parts like `AlertDialog.Trigger`, `AlertDialog.Close`, `Menu.Trigger` have `nativeButton` prop.  
Set `nativeButton={false}` when composing with a non-button element.

---

## Customization & Events

### Change event details

`onOpenChange`, `onValueChange`, `onPressedChange` receive `(value, eventDetails)`:

```tsx
<Dialog.Root
  onOpenChange={(open, eventDetails) => {
    eventDetails.reason           // 'trigger-press' | 'escape-key' | 'outside-press' | 'close-press' | ...
    eventDetails.event            // DOM event
    eventDetails.cancel()         // prevent component state from updating
    eventDetails.allowPropagation() // allow DOM event to propagate (Base UI stops it by default)
    eventDetails.isCanceled       // boolean
    eventDetails.isPropagationAllowed // boolean
  }}
/>
```

### Cancel internal state update (keep uncontrolled but block specific interactions)

```tsx
onOpenChange={(open, eventDetails) => {
  if (!open && hasUnsavedChanges) {
    eventDetails.cancel() // dialog stays open
    showConfirmation()
  }
}}
```

### Override Base UI's native event handling

```tsx
// Escape hatch — use when no dedicated prop exists yet
<button onKeyDown={(e) => e.preventBaseUIHandler()}>...</button>
```

### Controlled vs uncontrolled

```tsx
// Uncontrolled (default)
<Dialog.Root defaultOpen={false}>

// Controlled
<Dialog.Root open={open} onOpenChange={setOpen}>
```

---

## TypeScript

All types via namespaces: `Component.Part.Props` / `Component.Part.State`

### Props — wrap and forward all props

```tsx
import { Tooltip } from '@base-ui/react/tooltip'

function MyTooltip(props: Tooltip.Root.Props) {
  return <Tooltip.Root {...props} />
}
```

### State — shape of internal state

```tsx
// Use in render functions or className/style functions
function renderPositioner(props: Popover.Positioner.Props, state: Popover.Positioner.State) {
  return (
    <div {...props}>
      <span>Side: {state.side}</span>
      <span>Open: {state.open}</span>
    </div>
  )
}
<Popover.Positioner render={renderPositioner} />
```

### Event types

```tsx
function onValueChange(value: string, eventDetails: Combobox.Root.ChangeEventDetails) {}
function onOpenChange(open: boolean, eventDetails: Combobox.Root.ChangeEventDetails) {}
// Reason union: Combobox.Root.ChangeEventReason
```

### Other exported types

| Type | Use |
|------|-----|
| `Component.Root.Actions` | Shape of `actionsRef` object |
| `Toast.Root.ToastObject` | Toast properties interface |
| `useRender.ComponentProps` | Extended `ComponentProps` with `render` prop |

---

## Detached triggers

```tsx
const handle = AlertDialog.createHandle()

// Trigger anywhere in the tree
<AlertDialog.Trigger handle={handle}>Open</AlertDialog.Trigger>

// Root elsewhere
<AlertDialog.Root handle={handle}>...</AlertDialog.Root>
```

### Multiple detached triggers with payload

```tsx
const handle = AlertDialog.createHandle<{ id: string }>()

<AlertDialog.Trigger handle={handle} payload={{ id: '1' }}>Delete 1</AlertDialog.Trigger>
<AlertDialog.Trigger handle={handle} payload={{ id: '2' }}>Delete 2</AlertDialog.Trigger>

<AlertDialog.Root handle={handle}>
  {({ payload }) => (
    <AlertDialog.Portal>
      <AlertDialog.Popup>
        <AlertDialog.Title>Delete {payload?.id}?</AlertDialog.Title>
      </AlertDialog.Popup>
    </AlertDialog.Portal>
  )}
</AlertDialog.Root>
```

---

## Component import map

All from `@base-ui/react/<name>`:

| Category | Components |
|----------|-----------|
| Overlays | `alert-dialog` `dialog` `popover` `tooltip` `preview-card` |
| Menus | `menu` `menubar` `context-menu` `navigation-menu` |
| Forms | `checkbox` `radio-group` `switch` `select` `slider` `number-field` `input` `textarea` `field` `form` |
| Layout | `collapsible` `accordion` `tabs` `separator` `scroll-area` `fieldset` |
| Feedback | `progress` `meter` `toast` `alert` |
| Navigation | `pagination` `toolbar` |
| Other | `button` `toggle` `toggle-group` `avatar` `badge` `autocomplete` `combobox` `direction-provider` `use-render` |
