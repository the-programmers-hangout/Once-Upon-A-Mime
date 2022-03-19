import got from "got";
import { fileTypeFromStream } from "file-type";

export async function checkMimeType(attachmentUrl) {
  const stream = got.stream(attachmentUrl);
  const result = await fileTypeFromStream(stream);
  return result;
}
