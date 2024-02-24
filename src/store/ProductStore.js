import create from "zustand";
import axios from "axios";
import { axiosHeader, getBaseURL } from "./../utility/FunctionHelper";

const BaseUrl = getBaseURL();

const ProductStore = create((set) => ({
  BrandList: null,
  BrandListRequest: async () => {
    let res = await axios.get(`${BaseUrl}/api/v1/BrandList`);
    if (res.data["status"] === "success") {
      set({ BrandList: res.data["data"] });
    }
  },

  CategoryList: null,
  CategoryListRequest: async () => {
    let res = await axios.get(`${BaseUrl}/api/v1/CategoryList`);
    if (res.data["status"] === "success") {
      set({ CategoryList: res.data["data"] });
    }
  },

  ListByRemark: null,
  ListByRemarkRequest: async (Remark) => {
    set({ ListByRemark: null });
    let res = await axios.get(
      `${BaseUrl}/api/v1/ProductListByRemark/${Remark}`
    );
    if (res.data["status"] === "success") {
      set({ ListByRemark: res.data["data"] });
    }
  },

  ListProduct: null,
  ListByBrandRequest: async (BrandID) => {
    set({ ListProduct: null });
    let res = await axios.get(
      `${BaseUrl}/api/v1/ProductListByBrand/${BrandID}`
    );
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },
  ListByCategoryRequest: async (CategoryID) => {
    set({ ListProduct: null });
    let res = await axios.get(
      `${BaseUrl}/api/v1/ProductListByCategory/${CategoryID}`
    );
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },
  ListByKeywordRequest: async (Keyword) => {
    set({ ListProduct: null });
    let res = await axios.get(
      `${BaseUrl}/api/v1/ProductListByKeyword/${Keyword}`
    );
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"], AllProduct: res.data["data"] });
    }
  },
  ListByFilterRequest: async (postBody) => {
    set({ ListProduct: null });
    let res = await axios.post(
      `${BaseUrl}/api/v1/ProductListByFilter`,
      postBody
    );
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },

  SearchKeyword: "",
  SetSearchKeyword: async (keyword) => {
    set({ SearchKeyword: keyword });
  },

  Details: null,
  DetailsRequest: async (id) => {
    let res = await axios.get(`${BaseUrl}/api/v1/ProductDetails/${id}`);
    if (res.data["status"] === "success") {
      set({ Details: res.data["data"] });
    }
  },

  CreateProduct: null,
  CreateProductRequest: async (body) => {
    let res = await axios.post(
      `${BaseUrl}/api/v1/CreateProduct`,
      body,
      axiosHeader()
    );
    if (res.data["status"] === "success") {
      set({ CreateProduct: true });
    }
  },

  UpdateProduct: null,
  UpdateProductRequest: async (id, body) => {
    let res = await axios.post(
      `${BaseUrl}/api/v1/UpdateProduct/${id}`,
      body,
      axiosHeader()
    );
    if (res.data["status"] === "success") {
      set({ UpdateProduct: true });
    }
  },

  DeleteProduct: null,
  DeleteProductRequest: async (id) => {
    let res = await axios.get(
      `${BaseUrl}/api/v1/DeleteProduct/${id}`,
      axiosHeader()
    );
    if (res.data["status"] === "success") {
      set({ DeleteProduct: true });
    }
  },

  AllProduct: null,
  AllProductRequest: async () => {
    let res = await axios.get(`${BaseUrl}/api/v1/AllProductList`);
    if (res.data["status"] === "success") {
      set({ AllProduct: res.data.data });
    }
  },

  CreateCatagory: null,
  CreateCatagoryRequest: async (body) => {
    let res = await axios.post(
      `${BaseUrl}/api/v1/CreateCategory`,
      body,
      axiosHeader()
    );
    if (res.data["status"] === "success") {
      set({ CreateCatagory: true });
    }
  },

  UpdateCategory: null,
  UpdateCategoryRequest: async (id, body) => {
    let res = await axios.post(
      `${BaseUrl}/api/v1/UpdateCategory/${id}`,
      { categoryName: body.categoryName, categoryImg: body.categoryImg },
      axiosHeader()
    );
    if (res.data["status"] === "success") {
      set({ UpdateCategory: true });
    }
  },

  DeleteCategory: null,
  DeleteCategoryRequest: async (id) => {
    let res = await axios.get(
      `${BaseUrl}/api/v1/DeleteCategory/${id}`,
      axiosHeader()
    );
    if (res.data["status"] === "success") {
      set({ UpdateCatagory: true });
    }
  },

  CreateBrand: null,
  CreateBrandRequest: async (body) => {
    let res = await axios.post(
      `${BaseUrl}/api/v1/CreateBrand`,
      body,
      axiosHeader()
    );
    if (res.data["status"] === "success") {
      set({ CreateBrand: true });
    }
  },

  UpdateBrand: null,
  UpdateBrandRequest: async (id, body) => {
    let res = await axios.post(
      `${BaseUrl}/api/v1/UpdateBrand/${id}`,
      { brandName: body.brandName, brandImg: body.brandImg },
      axiosHeader()
    );
    if (res.data["status"] === "success") {
      set({ UpdateBrand: true });
    }
  },

  DeleteBrand: null,
  DeleteBrandRequest: async (id) => {
    let res = await axios.get(
      `${BaseUrl}/api/v1/DeleteBrand/${id}`,
      axiosHeader()
    );
    if (res.data["status"] === "success") {
      set({ DeleteBrand: true });
    }
  },

}));

export default ProductStore;
