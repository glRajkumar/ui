export type Employee = {
  id: string
  name: string
  email: string
  department: string
  role: string
  status: 'active' | 'inactive' | 'pending' | 'on-leave'
  salary: number
  joinDate: string
  location: string
}

const generateEmployeeData = (): Employee[] => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
  const roles = ['Manager', 'Senior', 'Junior', 'Lead', 'Intern']
  const statuses: Employee['status'][] = ['active', 'inactive', 'pending', 'on-leave']
  const locations = ['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin']
  const names = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Williams',
    'David Brown',
    'Emily Davis',
    'Michael Wilson',
    'Jessica Moore',
    'Christopher Taylor',
    'Amanda Anderson',
    'James Thomas',
    'Jennifer Jackson',
    'Robert White',
    'Lisa Harris',
    'William Martin',
    'Mary Thompson',
    'Richard Garcia',
    'Patricia Martinez',
    'Charles Robinson',
    'Linda Clark',
    'Daniel Rodriguez',
    'Barbara Lewis',
    'Matthew Lee',
    'Susan Walker',
    'Joseph Hall',
    'Karen Allen',
    'Thomas Young',
    'Nancy Hernandez',
    'Paul King',
    'Betty Wright',
  ]

  return names.map((name, index) => ({
    id: `EMP-${1000 + index}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@company.com`,
    department: departments[index % departments.length],
    role: roles[index % roles.length],
    status: statuses[index % statuses.length],
    salary: Math.floor(Math.random() * 100000) + 50000,
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 5),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28),
    )
      .toISOString()
      .split('T')[0],
    location: locations[index % locations.length],
  }))
}

export const employees: Employee[] = generateEmployeeData()
