﻿using AutoMapper;
using ecommerce_topicos3.DTO;
using ecommerce_topicos3.Models;

namespace ecommerce_topicos3.Mapping
{
    public class EntitiesToDTOMappingProfile : Profile
    {

        public EntitiesToDTOMappingProfile()
        {
            CreateMap<Estado, EstadoDTO>().ReverseMap();
            CreateMap<Estado, EstadoResponseDTO>().ReverseMap();
            CreateMap<Cidade, CidadeDTO>().ReverseMap();
            CreateMap<Cidade, CidadeResponseDTO>().ReverseMap();
            CreateMap<Usuario, UsuarioDTO>().ReverseMap();
            CreateMap<Usuario, UsuarioResponseDTO>().ReverseMap();
            CreateMap<Endereco, EnderecoDTO>().ReverseMap();
            CreateMap<Endereco, EnderecoResponseDTO>().ReverseMap();
            CreateMap<Game, GameDTO>().ReverseMap();
            CreateMap<Game, GameResponseDTO>().ReverseMap();
            CreateMap<ItemCompra, ItemCompraDTO>().ReverseMap();
            CreateMap<ItemCompra, ItemCompraResponseDTO>().ReverseMap();
            CreateMap<Compra, CompraDTO>().ReverseMap();
            CreateMap<Compra, CompraResponseDTO>().ReverseMap();
        }
    }
}
