import ErrorPage from 'pages/error'

interface CustomErrorProps {
  statusCode?: number
}

function CustomError({ statusCode = 500 }: CustomErrorProps) {
  return <ErrorPage statusCode={statusCode} />
}

export default CustomError
