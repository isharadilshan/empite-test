import {GET_NEARBY_RESTAURENTS} from '../endpoints';
import {RestClient} from '../rest-client';

export const getNearByRestaurents = () => {
  return RestClient.get(GET_NEARBY_RESTAURENTS);
};
