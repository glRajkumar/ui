'use client'

import { CopyIcon, SearchIcon, DollarSignIcon, AtSignIcon, SendIcon } from 'lucide-react'

import { ExItem, ExRow } from '@/components/examples/common'
import {
  InputGroupWrapper,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroup,
} from '@/components/ui/input-group'
import { InputGroupWrapper as FieldInputGroupWrapper } from '@/components/ui/field-wrapper'

function PrefixTextExample() {
  return (
    <InputGroupWrapper
      placeholder="username"
      addonStart={<InputGroupText>@</InputGroupText>}
      className="w-56"
    />
  )
}

function SuffixTextExample() {
  return (
    <InputGroupWrapper
      placeholder="yoursite"
      addonEnd={<InputGroupText>.com</InputGroupText>}
      className="w-56"
    />
  )
}

function PrefixIconExample() {
  return (
    <InputGroupWrapper
      placeholder="Search..."
      addonStart={
        <InputGroupText>
          <SearchIcon />
        </InputGroupText>
      }
      className="w-56"
    />
  )
}

function BothAddonsExample() {
  return (
    <InputGroupWrapper
      placeholder="0.00"
      addonStart={
        <InputGroupText>
          <DollarSignIcon />
        </InputGroupText>
      }
      addonEnd={<InputGroupText>USD</InputGroupText>}
      className="w-56"
    />
  )
}

function SuffixButtonExample() {
  return (
    <InputGroupWrapper
      defaultValue="https://example.com"
      addonEnd={
        <InputGroupButton>
          <CopyIcon />
        </InputGroupButton>
      }
      className="w-64"
      readOnly
    />
  )
}

function BothButtonsExample() {
  return (
    <InputGroupWrapper
      placeholder="Message..."
      addonStart={
        <InputGroupText>
          <AtSignIcon />
        </InputGroupText>
      }
      addonEnd={
        <InputGroupButton>
          <SendIcon />
        </InputGroupButton>
      }
      className="w-64"
    />
  )
}

function DisabledExample() {
  return (
    <InputGroupWrapper
      placeholder="Disabled"
      addonStart={<InputGroupText>@</InputGroupText>}
      disabled
      className="w-56"
    />
  )
}

function ErrorExample() {
  return (
    <FieldInputGroupWrapper
      name="username-err"
      label="Username"
      placeholder="username"
      addonStart={<InputGroupText>@</InputGroupText>}
      invalid
      error={{ message: 'Username is already taken.' }}
      className="w-72"
    />
  )
}

function FieldWrapperExample() {
  return (
    <FieldInputGroupWrapper
      name="amount"
      label="Amount"
      placeholder="0.00"
      addonStart={
        <InputGroupText>
          <DollarSignIcon />
        </InputGroupText>
      }
      addonEnd={<InputGroupText>USD</InputGroupText>}
      className="w-64"
    />
  )
}

export function InputGroupExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Text addons">
        <ExItem label="addonStart — prefix text (@)">
          <PrefixTextExample />
        </ExItem>
        <ExItem label="addonEnd — suffix text (.com)">
          <SuffixTextExample />
        </ExItem>
        <ExItem label="addonStart — prefix icon">
          <PrefixIconExample />
        </ExItem>
        <ExItem label="addonStart + addonEnd — currency">
          <BothAddonsExample />
        </ExItem>
      </ExRow>

      <ExRow label="Button addons">
        <ExItem label="addonEnd — icon button (copy)">
          <SuffixButtonExample />
        </ExItem>
        <ExItem label="addonStart icon + addonEnd button">
          <BothButtonsExample />
        </ExItem>
      </ExRow>

      <ExRow label="State">
        <ExItem label="Disabled">
          <DisabledExample />
        </ExItem>
      </ExRow>

      <ExRow label="InputGroupWrapper (field-wrapper)">
        <ExItem label="With label">
          <FieldWrapperExample />
        </ExItem>
        <ExItem label="Error state">
          <ErrorExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
