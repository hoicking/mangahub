export type Params = {
  [key: string]: string | number | boolean | undefined| null
} | FormData

type test<Type> = {
  name: Type,
  age: number,
  save: (_: Type) => Type
}