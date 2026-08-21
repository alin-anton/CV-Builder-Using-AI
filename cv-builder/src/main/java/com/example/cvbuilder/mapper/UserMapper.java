package com.example.cvbuilder.mapper;

import com.example.cvbuilder.dto.UserDtoResponse;
import com.example.cvbuilder.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserDtoResponse toDto(UserEntity userEntity);

    List<UserDtoResponse> toDtoList(List<UserEntity> userEntities);
}
