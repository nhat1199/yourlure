package fpt.custome.yourlure.controller.admin;

import fpt.custome.yourlure.dto.dtoInp.VariantDtoInput;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/admin/variant")
public interface AdminVariantController {

    @PostMapping("/save")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> save(@RequestBody VariantDtoInput variantDtoInput);

    @PostMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> update(@RequestBody VariantDtoInput variantDtoInput, @RequestParam Long id);

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
    ResponseEntity<Boolean> delete(@PathVariable("id") Long id);


}
