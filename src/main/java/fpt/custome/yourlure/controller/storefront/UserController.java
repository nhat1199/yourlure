package fpt.custome.yourlure.controller.storefront;

import fpt.custome.yourlure.dto.dtoInp.UserDataDTO;
import fpt.custome.yourlure.dto.dtoInp.UserDtoInp;
import fpt.custome.yourlure.dto.dtoOut.UserAddressDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserDtoOut;
import fpt.custome.yourlure.dto.dtoOut.UserResponseDTO;
import fpt.custome.yourlure.entity.address.Country;
import fpt.custome.yourlure.entity.address.District;
import fpt.custome.yourlure.entity.address.Province;
import fpt.custome.yourlure.entity.address.Ward;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RequestMapping(path = "/user")
public interface UserController {

    @GetMapping("/{id}")
    ResponseEntity<Optional<UserDtoOut>> getUser(@PathVariable Long id);

    @PostMapping("/update")
    ResponseEntity<Boolean> updateUser(HttpServletRequest req, @RequestBody UserDtoInp userDtoInp);

    @GetMapping("/get-all-country")
    ResponseEntity<List<Country>> getAllCountry();

    @PostMapping("/{provinceId}")
    ResponseEntity<Optional<Province>> findProvinceById(@PathVariable(name = "provinceId") Long id);

    @PostMapping("/{districtId}")
    ResponseEntity<Optional<District>> findDistrictById(@PathVariable(name = "districtId") Long id);

    @PostMapping("/{wardId}")
    ResponseEntity<Optional<Ward>> findWardById(@PathVariable(name = "wardId") Long id);

    @PostMapping("/get-address-se")
    ResponseEntity<List<UserAddressDtoOut>> getAddressUser(HttpServletRequest req);

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ApiOperation(value = "${UserController.search}", response = UserResponseDTO.class, authorizations = {@Authorization(value = "apiKey")})
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 404, message = "The user doesn't exist"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    List<UserResponseDTO> findAll();

    @GetMapping(value = "/me")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER')")
    @ApiOperation(value = "${UserController.me}", response = UserResponseDTO.class, authorizations = {@Authorization(value = "apiKey")})
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    UserResponseDTO whoami(HttpServletRequest req);

    @GetMapping("/refresh")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER')")
    String refresh(HttpServletRequest req);

    @GetMapping(value = "/{phone}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ApiOperation(value = "${UserController.search}", response = UserResponseDTO.class, authorizations = {@Authorization(value = "apiKey")})
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 404, message = "The user doesn't exist"), //
            @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    UserResponseDTO search(@ApiParam("phone") @PathVariable String phone);

    @PostMapping("/signup")
    @ApiOperation(value = "${UserController.signup}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 403, message = "Access denied"), //
            @ApiResponse(code = 422, message = "Username is already in use")})
    String signup(@ApiParam("Signup User") @RequestBody UserDataDTO user);

    @PostMapping("/signin")
    @ApiOperation(value = "${UserController.signin}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Something went wrong"), //
            @ApiResponse(code = 422, message = "Invalid username/password supplied")})
    String login(@RequestBody Map<String, String> user);


}
