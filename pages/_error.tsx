import Error from '@widgets/error'

interface CustomErrorProps {
  statusCode?: number
}

function CustomError({ statusCode = 500 }: CustomErrorProps) {
  return <Error statusCode={statusCode} />
}

export default CustomError
