import {CONSUME_API} from '../endpoints';
import {Axios} from '../rest-client';

export const consumeApi = () => {
  return Axios.get(CONSUME_API);
};
