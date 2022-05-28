import {GET_NEARBY_RESTAURENTS} from '../endpoints';
import {RestClient2} from '../rest-client';

export const getNearByRestaurents = () => {
  return RestClient2.get(GET_NEARBY_RESTAURENTS);
};
