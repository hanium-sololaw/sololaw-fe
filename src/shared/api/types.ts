/** Shared response envelope every backend endpoint (Spring Boot root + RAG service) wraps its payload in. */
export type ApiEnvelope<T> = {
  success: boolean
  data: T
}
