package com.sist.web.restcontroller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.dto.*;
import com.sist.web.entity.*;
import com.sist.web.service.*;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "false")
public class DsMemberRestController {

	@Autowired
	private DsMemberService mService;

	@GetMapping("member/check-id/{userId}")
	public ResponseEntity<ApiResponse> checkId(@PathVariable String userId) {
		// available이 true면 아이디가 존재함 (이미 사용 중인 아이디)
		boolean available = mService.checkUserIdExistence(userId);

		// available에 부정 연산자를 사용하여 가독성을 높임
		String msg = !available ? "사용 가능한 아이디 입니다." : "이미 사용 중인 아이디 입니다.";
		int errCode = !available ? 0 : 1001;

	    ApiResponse response = new ApiResponse(!available, msg, errCode);

	    return new ResponseEntity<>(response, !available ? HttpStatus.OK : HttpStatus.CONFLICT);
	}

	@PostMapping("member/signUp")
	public ResponseEntity<ApiResponse> memberSignUp(@RequestBody DsMemberDTO mDto) {
		try {
	        boolean isSuccess = mService.dsMemberInsert(mDto);
	        if (isSuccess) {
	            return new ResponseEntity<>(new ApiResponse(true, "회원 가입 성공", 0), HttpStatus.CREATED);
	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, "회원 가입 실패 (알 수 없는 오류)", 1001), HttpStatus.BAD_REQUEST);
	        }
	    } catch (IllegalArgumentException ex) {
	        return new ResponseEntity<>(new ApiResponse(false, ex.getMessage(), 1002), HttpStatus.BAD_REQUEST); // 400
	    } catch (RuntimeException ex) {
	        return new ResponseEntity<>(new ApiResponse(false, "서버 오류가 발생했습니다." + ex.getMessage(), 500), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    }
	}

	@PostMapping("member/signIn")
	public ResponseEntity<Map> memberSignIn(@RequestBody SignInDTO signInDTO) {
	    try {
	        DsMemberEntity check = mService.loginCheck(signInDTO.getUserId(), signInDTO.getUserPwd());

	        if (check != null) {
	            Map<String, Object> responseData = new HashMap<>();
	            responseData.put("msg", "OK");
	            responseData.put("userId", check.getUserId());
	            responseData.put("userName", check.getUserName());
	            responseData.put("gender", check.getGender());
	            return new ResponseEntity<>(responseData, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(Collections.singletonMap("msg", "NOPWD"), HttpStatus.UNAUTHORIZED); // 비밀번호 불일치
	        }
	    } catch (Exception ex) {
	        return new ResponseEntity<>(Collections.singletonMap("msg", "SERVER_ERROR"), HttpStatus.INTERNAL_SERVER_ERROR); // 서버 에러
	    }
	}
}