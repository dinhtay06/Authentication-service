package service.CSFC.CSFC_auth_service.controller.controller.customer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.CSFC.CSFC_auth_service.model.dto.request.ApplyCouponRequest;
import service.CSFC.CSFC_auth_service.model.dto.request.CouponRequest;
import service.CSFC.CSFC_auth_service.model.dto.response.ApiResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.ApplyCouponResponse;
import service.CSFC.CSFC_auth_service.model.dto.response.CouponResponse;
import service.CSFC.CSFC_auth_service.model.entity.Coupon;
import service.CSFC.CSFC_auth_service.service.CouponService;

import java.util.List;

@RestController
@RequestMapping("/api/engagement/coupons")
public class CouponController {
    @Autowired
    private CouponService couponService;

    @PostMapping("/apply")
    public ApiResponse<ApplyCouponResponse> apply(@RequestBody ApplyCouponRequest req){
        ApplyCouponResponse result = couponService.applyCoupon(req);
        return ApiResponse.success(
                result,
                "Áp dụng phiếu giảm giá thành công"
        );
    }

    @GetMapping
    public List<Coupon> getAll()
    {
        return couponService.getAll();
    }
    @PostMapping
    public CouponResponse createCoupon(@RequestBody CouponRequest request) {
        return couponService.createCoupon(request);
    }

//    @PutMapping("/{id}")
//    public CouponResponse updateCoupon(
//            @PathVariable Long id,
//            @RequestBody Coupon coupon) {
//
//        return couponService.updateCoupon(id, coupon);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteCoupon(@PathVariable Long id) {
//        couponService.deleteCoupon(id);
//    }
}
