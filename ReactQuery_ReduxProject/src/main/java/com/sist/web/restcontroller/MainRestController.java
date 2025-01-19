package com.sist.web.restcontroller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.dao.CookieDressDAO;
import com.sist.web.dao.CookieSuitDAO;
import com.sist.web.dao.DressDAO;
import com.sist.web.dao.SuitDAO;
import com.sist.web.entity.CookieDressVO;
import com.sist.web.entity.CookieSuitVO;
import com.sist.web.entity.DressEntity;
import com.sist.web.entity.DressVO;
import com.sist.web.entity.SuitEntity;
import com.sist.web.entity.SuitVO;

@RestController
@CrossOrigin(origins = "*")
public class MainRestController {
  @Autowired
  private DressDAO dDao;

  @Autowired
  private SuitDAO sDao;

  @Autowired
  private CookieDressDAO c_dDao;

  @Autowired
  private CookieSuitDAO c_sDao;

  @GetMapping("/main")
  public ResponseEntity<Map> main_data() {
	Map map = new HashMap();
	// 초기 값을 공백으로 설정하여 값을 직접 넣어 NullPointerException을 방지
    map.put("oneData", null);
    map.put("twoData", new ArrayList<>());
    map.put("threeData", new ArrayList<>());

    try {
        List<DressVO> dList = dDao.dressTop5();
        List<SuitVO> sList = sDao.suitTop4();

        if (!dList.isEmpty()) {
            map.put("oneData", dList.get(0));
        }

        List<DressVO> twoData = dList.stream().skip(1).limit(4).collect(Collectors.toList());
        List<SuitVO> threeData = sList.stream().limit(4).collect(Collectors.toList());

        map.put("twoData", twoData);
        map.put("threeData", threeData);

    } catch (Exception ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @GetMapping("/cookieDress/{id}")
  public ResponseEntity<CookieDressVO> cookieDressData(@PathVariable int id) {
	  Optional<DressEntity> c_dEntity = c_dDao.findByNo(id);
	  if (c_dEntity.isPresent()) {
		  DressEntity entity = c_dEntity.get();
		  CookieDressVO cookieVO = new CookieDressVO(entity.getNo(), entity.getImage(), entity.getSubject());
		  return new ResponseEntity<>(cookieVO, HttpStatus.OK);
	  } else {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
  }

  // Dress와 다른 방식으로 구현해봄.
  // no를 기준으로 SuitEntity를 조회하여 no, image, subject 정보를 담은 CookieSuitVO를 반환하는 쿼리.
  @GetMapping("/cookieSuit/{id}")
  public ResponseEntity<CookieSuitVO> cookieSuitData(@PathVariable int id) {
	  Optional<SuitEntity> c_sEntity = c_sDao.findByNo(id);
	  if (c_sEntity.isPresent()) {
		  SuitEntity entity = c_sEntity.get();
		  CookieSuitVO cookieVO = new CookieSuitVO(entity.getNo(), entity.getImage(), entity.getSubject());
		  return new ResponseEntity<>(cookieVO, HttpStatus.OK);
	  } else {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
  }
}