import { TLoginFormData, loginUserForm } from '@/lib/validations/login'
import { prisma } from '@/server/db'
import { encrypt } from '@/utils/crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.log('rntrando en el register')

  try {
    /**
     * extraemos el body de la request
     */
    const body: TLoginFormData = await req.json()
    console.log('🚀 ~ file: route.ts:14 ~ POST ~ body:', body)
    /**
     * validamos :
     * username: string | minLength = 3 | maxLength = 20 | required
     * email: string | email | required
     * password: string | minLength = 8 | maxLength = 40 | required
     */
    const { username, email, password } = loginUserForm.parse(body)

    /**
     * hash del password antes de guardarlo en la base de datos
     */
    const hashedPassword = encrypt(password)
    console.log(
      '🚀 ~ file: route.ts:27 ~ POST ~ hashedPassword:',
      hashedPassword
    )
    if (!hashedPassword) {
      throw new Error('Error hashing password')
    }

    /**
     * creamos el usuario en la base de datos
     */

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    })
    console.log('🚀 ~ file: route.ts:43 ~ POST ~ newUser:', newUser)

    if (!newUser) {
      return NextResponse.json(
        {
          status: 'Failed',
          error: true,
          msg: 'Error creating user',
        },
        { status: 400 }
      )
    }
    return NextResponse.json(
      {
        status: 'success',
        error: false,
        msg: 'User created',
      },
      { status: 200 }
    )
  } catch (error: any) {
    return {
      status: 'Failed',
      error: true,
      msg: error.messge,
    }
  }
}
