import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { utilizador } from '../models/utilizadorModel';

export const utilizadorAPI = createApi({

  reducerPath: "contactsApi",

  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),

  tagTypes : ["utilizador"],

  endpoints: (builder) => ({

    utilizadores: builder.query<utilizador[], void>({

      query: (id) => "/utilizadores/",
      providesTags: ["utilizador"],
    }),

    utilizador: builder.query<utilizador, string>({

      query: (id) => `/utilizadores/${id}`,
      providesTags: ["utilizador"],
    }),

    addUtilizador: builder.mutation < {}, utilizador>({
      query: (utilizador)=>({
        url: "/utilizadores",
        method: "POST",
        body: utilizador,
        
      }),
      invalidatesTags: ["utilizador"],
    }),
      deleteUtilizador: builder.mutation < void, string>({
        query: (id) => ({
          url: `/utilizadores/${id}`,
          method: "DELETE",      
        }),
        
        invalidatesTags: ["utilizador"],
    }),

     updateUtilizador: builder.mutation < void, utilizador>({
       query: ({ id, ...rest }) => ({
        url: `/utilizadores/${id}`,
         method: "PUT", 
        body: rest,
      }),
      
      invalidatesTags: ["utilizador"],
  }),

      
  }),

});

export const { useUtilizadoresQuery, useUtilizadorQuery, useAddUtilizadorMutation , useDeleteUtilizadorMutation, useUpdateUtilizadorMutation} = utilizadorAPI;