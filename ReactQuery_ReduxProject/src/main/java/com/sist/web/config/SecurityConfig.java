package com.sist.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	/*
		Spring 컨테이너는 @Configuration 클래스 내부의 모든 메소드를 스캔하여 @Bean 어노테이션이 붙은 메소드를 찾아 Bean으로 자동 등록합니다. 따라서 메소드의 접근 제한자는 Bean 등록에 영향을 미치지 않습니다.
		public 키워드를 생략하면 해당 메소드가 클래스 내부에서만 사용되도록 제한하여 코드의 캡슐화를 높일 수 있습니다. 외부에서 불필요하게 접근하는 것을 막아 코드의 유지보수성을 향상시킵니다.
		Spring 버전에 따른 차이: 과거 Spring 버전에서는 @Bean 메소드가 반드시 public으로 선언되어야 했지만, 최신 버전에서는 이러한 제약이 사라졌습니다.
	*/
	@Bean
	BCryptPasswordEncoder enPwd() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests((authz) -> authz
				.anyRequest().permitAll()
				)
		.formLogin((form) -> form
				.permitAll()
				);
		return http.build();
	}

}
