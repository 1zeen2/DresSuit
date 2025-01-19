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

import com.sist.web.dao.SuitDAO;
import com.sist.web.entity.SuitEntity;
import com.sist.web.entity.SuitVO;

@RestController
@CrossOrigin(origins = "*")
public class SuitRestController {
	@Autowired
	private SuitDAO sDao;

	@GetMapping("/suit/list/{page}")
	public ResponseEntity<Map> suit_list(@PathVariable int page) {
		Map map = new HashMap();

		try {
			int rowSize = 12;
			int start = (rowSize * page) - rowSize;

			List<SuitVO> sList = sDao.suitListData(start);

			int count = (int)sDao.count();
			int totalpage = (int)(Math.ceil(count / 12.0));

			final int BLOCK = 10;

			int startPage = ((page - 1) / BLOCK * BLOCK) + 1;
			int endPage = ((page - 1) / BLOCK * BLOCK) + BLOCK;

			if (endPage > totalpage) {
				endPage = totalpage;
			}

			map.put("sList", sList);
			map.put("curpage", page);
			map.put("totalpage", totalpage);
			map.put("startPage", startPage);
			map.put("endPage", endPage);

		} catch(Exception ex) {

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	// /suit/find/${curpage}/${subject}
	@GetMapping("/suit/find/{page}/{subject}")
	public ResponseEntity<Map> suit_find(@PathVariable("page") int page, @PathVariable("subject") String subject) {
		Map map = new HashMap();

		try {
			int rowSize = 12;
			int start = (page - 1) * rowSize;

			List<SuitVO> sList = sDao.suitFindData(start, subject);

			int totalpage = sDao.suitFindTotalPage(subject);

			final int BLOCK = 10;

			int startPage = ((page - 1) / BLOCK * BLOCK) + 1;
			int endPage = ((page - 1) / BLOCK * BLOCK) + BLOCK;

			if (endPage > totalpage) {
				endPage = totalpage;
			}

			map.put("sList", sList);
			map.put("curpage", page);
			map.put("totalpage", totalpage);
			map.put("startPage", startPage);
			map.put("endPage", endPage);

		} catch(Exception ex) {

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	@GetMapping("/suit/detail/{no}")
    public ResponseEntity<SuitEntity> suit_detail(@PathVariable("no") int no) {
    	SuitEntity svo = new SuitEntity();

    	try {
    		svo = sDao.findByNo(no);
    		sDao.save(svo);

    		svo = sDao.findByNo(no);

    	} catch(Exception ex) {

    		return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	}

    	return new ResponseEntity<>(svo, HttpStatus.OK);
    }

}
