import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Pool } from 'pg'
import {
  Kysely,
  PostgresDialect,
} from 'kysely'


interface MovieTable {
  id: number
  name: string
  stars: number
}

// Keys of this interface are table names.
interface Database {
  movie: MovieTable
}

const db = new Kysely<Database>({
  // Use MysqlDialect for MySQL and SqliteDialect for SQLite.
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: ''
    }),
  }),
})

export const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

const movie = await db
  .selectFrom('movie')
  .select(['id', 'name', 'stars'])
  .executeTakeFirst()
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Success!",
        input: movie,
      },
      null,
      2
    ),
  };
};
