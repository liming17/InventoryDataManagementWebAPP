import  {FETCH_PRODUCT_REQUEST,FETCH_PRODUCT_SUCCESS,FETCH_PRODUCT_FAILURE,
    ADD_PRODUCT_AMOUNT,SUB_PRODUCT_AMOUNT,CHANGE_PRODUCT_AMOUNT,
    POST_ORDER_INFO_SUCCESS,RESET_STATE} from './OrderType';

const initialState = {
    products: [],
    addedProducts:[],
    size:5,
    page: 1,
    totalPage:0,
    order:{},
    error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_PRODUCT_REQUEST:
            return{
                ...state
            };
        case FETCH_PRODUCT_SUCCESS:
            // let setDefaultAmount = JSON.parse(JSON.stringify(action.payload.content));
            // setDefaultAmount.map((product)=>({...product,amount:0}));
            return{
                ...state,
                products:  [
                     ...action.payload.content.map(item => ({
                            ...item,
                            amount: 0
                          }))
                    ],
                page: action.page,
                totalPage : action.payload.totalPages
            };

        case FETCH_PRODUCT_FAILURE:
            return{
                ...state,
                products: [],
                error: action.payload
            };
        case ADD_PRODUCT_AMOUNT:
            let addedProduct= state.products.find(product=> product.id === action.id);
            let existedAddedProduct= state.addedProducts.find(product=> action.id === product.id);
            

            if(existedAddedProduct){
                addedProduct.amount += 1; 
                // existedAddedProduct.amount += 1; // CAUTION!! don't need to change the value here, addedProduct is a referential var
                return {...state}
            }else{
                addedProduct.amount += 1; 
                return{
                    ...state,
                    addedProducts:[...state.addedProducts,addedProduct]
                }
            }
        case SUB_PRODUCT_AMOUNT:
            let subProduct= state.products.find(product=> product.id === action.id);
            let existedSubProduct= state.addedProducts.find(product=> action.id === product.id);

            if(subProduct.amount === 1){
                subProduct.amount = 0; 
                // remove product from list
                let newProduct = state.addedProducts.filter(product=>product.id !== action.id)
                return {
                    ...state,
                    addedProducts:newProduct
                }
            }else{
                if(existedSubProduct){
                    subProduct.amount -= 1; 
                }
                return{
                    ...state
                }
            }
            case CHANGE_PRODUCT_AMOUNT:
                let changedProduct= state.products.find(product=> product.id === action.id);
                let existedProduct= state.addedProducts.find(product=> action.id === product.id);
                if(action.amount === 0){
                    changedProduct.amount = 0;
                    let newProduct = state.addedProducts.filter(product=>product.id !== action.id);
                    return{
                        ...state,
                        addedProducts:newProduct
                    }

                }else{
                    if(existedProduct){
                        changedProduct.amount = action.amount;
                        return{
                            ...state
                            }
                    }else{
                        changedProduct.amount = action.amount;
                        return{
                            ...state,
                            addedProducts:[...state.addedProducts,changedProduct]
                        }

                    }
                }
            case POST_ORDER_INFO_SUCCESS:
                return{
                    ...state,
                    order:action.order
                }
            case RESET_STATE:
                return initialState;

        default:
            return state;
    }
};

export default reducer;