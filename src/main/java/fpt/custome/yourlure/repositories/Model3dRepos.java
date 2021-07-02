package fpt.custome.yourlure.repositories;

import fpt.custome.yourlure.entity.customizemodel.DefaultMaterial;
import fpt.custome.yourlure.entity.customizemodel.Model3d;
import fpt.custome.yourlure.entity.customizemodel.Texture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Model3dRepos extends JpaRepository<Model3d, Long> {

    Optional<Model3d> findByProductProductId(Long productId);

}
