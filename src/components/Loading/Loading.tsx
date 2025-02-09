import SyncLoader  from "react-spinners/SyncLoader";

import { LoadingContainer} from './Loading.styles'

function Loading() {
  return ( 
    <LoadingContainer>
      <SyncLoader size={30} />
    </LoadingContainer>
  );
}

export default Loading;