import  {FETCH_PRODUCT_REQUEST,FETCH_PRODUCT_SUCCESS,FETCH_PRODUCT_FAILURE,
    ADD_PRODUCT_AMOUNT,SUB_PRODUCT_AMOUNT,CHANGE_PRODUCT_AMOUNT,
    POST_ORDER_INFO_SUCCESS} from './OrderType';
import axios from 'axios';


//just a func to fetch the product info
export const fetchProduct = (page,size) =>{
    let urlPage = page-1;
    return dispatch => {
        dispatch(fetchProductRequest);
        axios.get("http://localhost:8082/rest/products?page="+urlPage+"&size="+size)
        .then(response =>{
            dispatch(fetchProductSuccess(response.data,page));
           
        })
        .catch(error =>{
            dispatch(fetchProductFailure(error.message));
        });
    }
}

//actions:

export const addProductAmount = (id) =>{
   return{
       type: ADD_PRODUCT_AMOUNT,
       id
   }
}

export const subProductAmount = (id) =>{
    return{
        type: SUB_PRODUCT_AMOUNT,
        id
    }
 }

 export const submitOrder = (order) =>{
     return{
         type: POST_ORDER_INFO_SUCCESS,
         order
     }
 }

 export const changeProductAmount = (id,amount) =>{
    return{
        type: CHANGE_PRODUCT_AMOUNT,
        id,
        amount
    }
 }

const fetchProductRequest = () =>{
    return {
        type: FETCH_PRODUCT_REQUEST
    };
};

const fetchProductSuccess = (data,page) =>{
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: data,
        page: page
    };
};


const fetchProductFailure = errors =>{
    return {
        type: FETCH_PRODUCT_FAILURE,
        payload: errors
    };
};