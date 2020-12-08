
import { decodeToken } from "./services";

const context = async ({ req }) => {
    let authToken = null;
    let user = null;
  console.log(req.headers.authorization)
    try {
      authToken = req.headers.authorization;
      // console.log(req.headers)
      if (authToken) {
        user = await decodeToken(authToken);
      }
    } catch (e) {
      console.warn(`No se pudo autenticar el token: ${authToken}`);
    }
    // console.log(authToken)
    return {
      authToken,
      user
    };
  } 

  export default context;
  
