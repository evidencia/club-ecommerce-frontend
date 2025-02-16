import SyncLoader  from "react-spinners/SyncLoader";

import { LoadingContainer} from './Loading.styles'

interface LoadingProps {
  message?: string
}

function Loading({ message }: LoadingProps) {
  return ( 
    <LoadingContainer>
      {message && <p>{message}</p>}
      <SyncLoader size={30} />
    </LoadingContainer>
  );
}

export default Loading;