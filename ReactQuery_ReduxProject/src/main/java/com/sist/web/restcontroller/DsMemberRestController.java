package com.sist.web.restcontroller;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.CrossOrigin; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RestController;
  
import com.sist.web.entity.*; 
import com.sist.web.service.*; 
import com.sist.web.dto.*;

@RestController
@CrossOrigin(origins = "*")
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
	public ResponseEntity<ApiResponse> memberSignIn(@RequestBody DsMemberEntity mvo) {
		try {
			DsMemberEntity check = mService.loginCheck(mvo.getUserId(), mvo.getUserPwd());
			
			if (check != null) {
				return new ResponseEntity<>(new ApiResponse(true, "로그인 되었습니다.", 0), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "아이디 또는 비밀번호가 일치하지 않습니다.", 1001), HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(
					new ApiResponse(false, "서버 에러가 방생하였습니다. 다시 시도해주시기 바랍니다.", 500), 
					HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
	
	}
}