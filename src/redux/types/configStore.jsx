import { applyMiddleware, combineReducers, createStore, compose } from "redux"; 
import { thunk } from "redux-thunk";
import { CarouselReducer } from "../reducers/CarouselReducer";
import { QuanLyPhimReducer } from "../reducers/QuanLyPhimReducer";
import { QuanLyRapReducer } from "../reducers/QuanLyRapReducer";
import { QuanLyNguoiDungReducer } from "../reducers/QuanLyNguoiDungReducer";
import { QuanLyDatVeReducer } from "../reducers/QuanLyDatVeReducer";

const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);