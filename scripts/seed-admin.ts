import 'dotenv/config'
import { createSuperAdmin } from '../lib/auth'

async function main() {
  try {
    console.log('Creating super admin...')
    await createSuperAdmin()
    console.log('Super admin created successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error creating super admin:', error)
    process.exit(1)
  }
}

main()
