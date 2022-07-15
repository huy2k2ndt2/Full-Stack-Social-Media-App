import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  // projectId: process.env.REACT_APP_SANITY_PROJECTID,
  projectId: "o2zyqrk1",
  dataset: "production",
  apiVersion: "2022-01-20",
  useCdn: true,
  // token: process.env.REACT_APP_SANITY_TOKEN,
  token:
    "sk4QP4fZCmwiiNCS9i1mJvUeColAXRz1WxQGi0sYSn7MPXotQ7aZlHjCKAlv0CmSB2DBsHEFraV0WHDcIkvDWXOxUKovxHeN0G7Ggy81F6gRs8lowxCllynYUhPP3FqhACWRI2ZIbU61RpDtjAlF8kIa3w2s8ImFbVA44sOQrLiD1VwGdI65",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
