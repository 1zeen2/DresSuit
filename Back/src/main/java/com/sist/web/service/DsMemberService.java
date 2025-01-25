package com.sist.web.service;

import com.sist.web.dto.ApiResponse;
import com.sist.web.dto.DsMemberDTO;
import com.sist.web.entity.DsMemberEntity;

public interface DsMemberService {

	public boolean checkUserIdExistence(String userId);

	public DsMemberEntity loginCheck(String userId, String userPwd);

	public boolean dsMemberInsert(DsMemberDTO mDto);

	public ApiResponse signUp(DsMemberDTO mDto);
}
