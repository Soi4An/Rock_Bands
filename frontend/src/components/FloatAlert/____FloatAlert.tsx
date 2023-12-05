// import { setMessage } from '../../redux/slices/_____messageSlice';

import Alert from 'react-bootstrap/Alert';
import { FloatMessage } from '../../types/FloatMessage';
import { useAppDispatch } from '../../redux/hooks';

type Props = {
  message: FloatMessage,
};

export const FloatAlert:React.FC<Props> = ({ message }) => {
  // const [isOpacity, setIsOpasity]
  const dispatch = useAppDispatch();

  return (
    <Alert
      id="alert-item"
      variant={message.type}
      dismissible
      className="mb-0 w-100 d-flex flex-column align-items-center"
      style={{ position: 'absolute', zIndex: 3 }}
      // onClose={() => dispatch(setMessage(null))}
    >
      <Alert.Heading>{message.title}</Alert.Heading>
      <p>{message.content}</p>
    </Alert>
  );
};
