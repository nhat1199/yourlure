package fpt.custome.yourlure.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_Image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Nullable
    @Column(name = "linkImage")
    private String linkImage;

    @JsonIgnore
    @Nullable
    @ManyToOne
    @JoinColumn(name = "productID", nullable = true)
    private Product product;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "campaignid", nullable = true)
    private Campaign campaign;
}
