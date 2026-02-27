package service.CSFC.CSFC_auth_service.common.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import service.CSFC.CSFC_auth_service.common.security.AuthorizationFilter;
import service.CSFC.CSFC_auth_service.common.security.CustomerUserDetailsService;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

   @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthorizationFilter authorizationFilter) throws Exception {
        return  http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> {
                    request.requestMatchers(
                                    "/auth/register",
                                    "/auth/login",
                                    "/auth/refresh"
                            ).permitAll()

                            .anyRequest().authenticated();
                })
                .addFilterBefore(authorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
   }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, CustomerUserDetailsService customerUserDetailsService) throws Exception {
        AuthenticationManagerBuilder authBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        authBuilder
                .userDetailsService(customerUserDetailsService)
                .passwordEncoder(passwordEncoder());

        return authBuilder.build();
    }
}
