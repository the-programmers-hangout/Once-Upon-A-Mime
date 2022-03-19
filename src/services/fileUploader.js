import Pastecord from "pastecord";
const Client = new Pastecord();

export async function uploadFile(body) {
  const Data = await Client.publish(body);
  return Data.url;
}
