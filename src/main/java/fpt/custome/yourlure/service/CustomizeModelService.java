package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.CustomModelDto;
import fpt.custome.yourlure.entity.customizemodel.CustomType;
import fpt.custome.yourlure.entity.customizemodel.CustomizeModel;
import fpt.custome.yourlure.entity.customizemodel.Model3d;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public interface CustomizeModelService {

    Model3d createModel3d()

    CustomizeModel createCustomizeModel(HttpServletRequest rq, CustomModelDto customModelDto) throws IOException;

    CustomizeModel updateCustomizeModel(HttpServletRequest rq, CustomizeModel customizeModel);

    Boolean deleteCustomizeModel(HttpServletRequest rq, Long customizeModelId);

    List<Model3d> findAllCustomizeModelByUser(HttpServletRequest rq);

    List<CustomType> findAllCustomType();

}
