package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Category;
import fpt.custome.yourlure.entity.Image;
import fpt.custome.yourlure.entity.Variant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminProductDetailDtoOut {

    private Long productId;
    private String productName;
    private Float defaultPrice;
    private String description;
    private String content;
    private Float minWeight;
    private Float defaultWeight;
    private Float maxWeight;
    private Float length;
    private String material;
    private Float hookSize;
    private String deepDiving;
    private Boolean customizable;
    private String brand;
    private Boolean visibleInStorefront;
    private Date dateCreate;
    private String imgUrlModel;
    private Category category;
    private Collection<Image> imageCollection;
    private Collection<Variant> variantCollection;

}
