package com.sist.web.restcontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.dao.DressDAO;
import com.sist.web.entity.DressEntity;
import com.sist.web.entity.DressVO;

@RestController
@CrossOrigin(origins = "*")
public class DressRestController {
	@Autowired
	private DressDAO dDao;

	@GetMapping("/dress/list/{page}")
	public ResponseEntity<Map> dress_list(@PathVariable int page) {
		Map map = new HashMap();

		try {
			int rowSize = 12;
			int start = (rowSize * page) - rowSize;

			List<DressVO> dList = dDao.dressListData(start);

			int count = (int)dDao.count();
			int totalpage = (int)(Math.ceil(count / 12.0));

			final int BLOCK = 10;

			int startPage = ((page - 1) / BLOCK * BLOCK) + 1;
			int endPage = ((page - 1) / BLOCK * BLOCK) + BLOCK;

			if (endPage > totalpage) {
				endPage = totalpage;
			}

			map.put("dList", dList);
			map.put("curpage", page);
			map.put("totalpage", totalpage);
			map.put("startPage", startPage);
			map.put("endPage", endPage);

		} catch(Exception ex) {

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	// /dress/find/${curpage}/${subject}
    @GetMapping("/dress/find/{page}/{subject}")
    public ResponseEntity<Map> dress_find(@PathVariable("page") int page, @PathVariable("subject") String subject) {
    	Map map = new HashMap();

    	try {
    		int rowSize = 12;
    		int start = (page - 1) * rowSize;

    		List<DressVO> dList = dDao.dressFindData(start, subject);

    		int totalpage = dDao.dressFindTotalPage(subject);

    		final int BLOCK = 10;

    		int startPage = ((page - 1) / BLOCK * BLOCK) + 1;
    		int endPage = ((page - 1) / BLOCK * BLOCK) + BLOCK;

            if (endPage > totalpage) {
				endPage = totalpage;
			}

            map.put("dList", dList);
            map.put("curpage", page);
            map.put("totalpage", totalpage);
            map.put("startPage", startPage);
            map.put("endPage", endPage);

    	} catch(Exception ex) {

    		return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	}

    	return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/dress/detail/{no}")
    public ResponseEntity<DressEntity> dress_detail(@PathVariable("no") int no) {
    	DressEntity dvo = new DressEntity();

    	try {
    		dvo = dDao.findByNo(no);
//    		vo.setHit(vo.getHit() + 1);
    		dDao.save(dvo);

    		dvo = dDao.findByNo(no);

    	} catch(Exception ex) {

    		return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	}

    	return new ResponseEntity<>(dvo, HttpStatus.OK);
    }

}
