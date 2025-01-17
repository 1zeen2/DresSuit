package com.sist.web.restcontroller;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.entity.*;

import com.sist.web.dao.*;

@RestController
@CrossOrigin(origins = "*")
public class DsBoardRestController {
	@Autowired
	private DsBoardDAO bDao;
	
	@GetMapping("/board/list/{page}")
	public ResponseEntity<Map> board_list(@PathVariable("page") int page) {
		Map map = new HashMap();
		
		try {
			int rowSize = 10;
			int start = (page - 1) * rowSize;
			
			List<DsBoardEntity> list = bDao.boardListData(start);
			
			for(DsBoardEntity dsb : list)
			   {
				   String day = dsb.getRegdate();
				   day = day.substring(0, day.indexOf(" "));
				   dsb.setRegdate(day);
			   }
			
			int totalpage = (int)(Math.ceil(bDao.count() / 10.0));
			
			map.put("bList", list);
			map.put("curpage", page);
			map.put("totalpage", totalpage);
			map.put("today", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
			
		} catch (Exception ex) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
	@PostMapping("board/insert")
	public ResponseEntity<Map> board_insert(@RequestBody DsBoardEntity bvo) {
		System.out.println(bvo);
		
		Map map = new HashMap();
		
		try {
			bvo.setHit(0);
			
			DsBoardEntity temp_bvo = bDao.save(bvo);
			
			map.put("bvo", temp_bvo);
			map.put("msg", "yes");
		} catch (Exception ex) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map, HttpStatus.CREATED);
	}
	
	@GetMapping("/board/detail/{no}")
	public ResponseEntity<DsBoardEntity> board_detail(@PathVariable("no") int no) {
		DsBoardEntity bvo = null;
		
		try {
			bvo = bDao.findByNo(no);
			bvo.setHit(bvo.getHit() + 1);
			bDao.save(bvo);
			bvo = bDao.findByNo(no);
			
		} catch (Exception ex) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(bvo, HttpStatus.OK);
	}
	
	@GetMapping("/board/update/{no}")
	public ResponseEntity<DsBoardEntity> board_update(@PathVariable("no") int no) {
		DsBoardEntity bvo = new DsBoardEntity();
		
		try {
			bvo = bDao.findByNo(no);
		} catch (Exception ex) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(bvo, HttpStatus.OK);
	}
	
	@PutMapping("/board/update_ok/{no}")
	public ResponseEntity<Map> board_update_ok(@PathVariable("no") int no, @RequestBody DsBoardEntity bvo) {
		Map map = new HashMap();
		
		try {
			DsBoardEntity ubvo = bDao.findByNo(no);
			
			if (bvo.getPwd().equals(ubvo.getPwd())) {
				bvo.setNo(no);
				bvo.setHit(ubvo.getHit());
				bDao.save(bvo);
				map.put("msg", "yes");
			} else {
				map.put("msg", "no");
			}
		} catch(Exception ex) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
	@DeleteMapping("/board/delete/{no}/{pwd}")
	public ResponseEntity<Map> board_delete(@PathVariable("no") int no,
											@PathVariable("pwd")String pwd) {
		Map map = new HashMap();
		
		try {
			DsBoardEntity bvo = bDao.findByNo(no);
			
			if (pwd.equals(bvo.getPwd())) {
				bDao.delete(bvo);
				map.put("msg", "yes");
			} else {
				map.put("msg", "no");
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
}