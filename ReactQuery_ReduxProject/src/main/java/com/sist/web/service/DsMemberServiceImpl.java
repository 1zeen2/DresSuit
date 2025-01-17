package com.sist.web.service;
  
import java.util.ArrayList;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
  
import com.sist.web.dao.*;
import com.sist.web.dto.*;
import com.sist.web.entity.*;
import com.sist.web.exception.*;
  
@Service 
public class DsMemberServiceImpl implements DsMemberService {
	
	@Value("${app.default.profile-image}")
    private String defaultProfileImage;
  
	@Autowired
	private DsMemberDAO mDao;
	
	@Autowired
	private BCryptPasswordEncoder pwdEnco;
	
	@Override
	 public boolean checkUserIdExistence(String userId) {
        return mDao.existsByUserId(userId);
	}
  
	@Override
	public DsMemberEntity loginCheck(String userId, String userPwd) {
		DsMemberEntity mvo = mDao.findByUserId(userId); 
		if (mvo != null &&  pwdEnco.matches(userPwd, mvo.getUserPwd())) {
			return mvo;
		}
		return null; 
	}

	@Override
	public boolean dsMemberInsert(DsMemberDTO mDto) {
		if (mDto == null || mDto.getUserId() == null || mDto.getUserId().isEmpty()) {
	        return false;
	    }
		
		try {
			if (mDto.getUserPwd() == null || mDto.getUserPwd().isEmpty()) {
				throw new IllegalArgumentException("비밀번호는 필수 입력 항목입니다.");
			}
			
			List<ValidatorException> exceptions = new ArrayList<>();
			
			String password = mDto.getUserPwd();
			
			int minLength = 8;
			int maxLength = 16;
			
			String passwordRegex = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,16}$";
			if (!password.matches(passwordRegex)) {
		        if (!password.matches(".*[a-zA-Z].*")) exceptions.add(new PwdCharException("영문자"));
		        if (!password.matches(".*[0-9].*")) exceptions.add(new PwdCharException("숫자"));
		        if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) exceptions.add(new PwdCharException("특수문자"));
		    }
			
			if (!exceptions.isEmpty()) {
				throw exceptions.get(0);
			}
			
			String encoPwd = null;
			try {
				encoPwd = pwdEnco.encode(password);
			} catch (Exception ex) {
				ex.printStackTrace();
				throw new RuntimeException("비밀번호 암호화 중 오류가 발생했습니다.");
			}
			
			DsMemberEntity member = new DsMemberEntity();
            member.setUserId(mDto.getUserId());
            member.setUserPwd(encoPwd);
            member.setUserName(mDto.getUserName());
            member.setGender(mDto.getGender());
            member.setAddr1(mDto.getAddr1());
            member.setAddr2(mDto.getAddr2());
            member.setPhone(mDto.getPhone());
            member.setEmail(mDto.getEmail());
            member.setBirth(mDto.getBirth());
            member.setPost(mDto.getPost());
            member.setProfileImage(mDto.getProfileImage());
			
			mDao.save(member); 
			return true; 
		} catch (IllegalArgumentException ex) {
	        System.err.println("유효성 검사 오류 : " + ex.getMessage());
	        return false;
	    } catch (RuntimeException ex) {
			System.err.println("회원 가입 중 오류 발생 : " + ex.getMessage());
			return false;
		}
	}

	@Override
	public ApiResponse signUp(DsMemberDTO mDto) {
		try {
			if(mDao.existsByUserId(mDto.getUserId())) {
				throw new DuplicateMemberException(mDto.getUserId());
			}
			
			boolean isSuccess = dsMemberInsert(mDto);
			
			if (isSuccess) {
	            return new ApiResponse(true, "회원 가입 성공", 0);
	        } else {
	            return new ApiResponse(false, "회원 가입 실패", 1001); // 더 구체적인 메시지 필요
	        }
		} catch (DuplicateMemberException ex) {
			return new ApiResponse(false, ex.getMessage(), 1001);
		}
	}
}