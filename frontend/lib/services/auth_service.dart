import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService{
    final String baseUrl = 'http://localhost:5000/api/auth';

    Future<Map<String, dynamic>> registrer(String login, String email, String password, String role) async {
        final response = await http.post(
            Uri.parse('$baseUrl/register'),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({'login': login, 'email': email, 'password': password, 'role': role}),
        );
        return jsonDecode(response.body);
    }

    Future<Map<String, dynamic>>login(String email, String password) async{
        final response = await http.post(
            Uri.parse('$baseUrl/login'),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({'email':email, 'password': password}),
        );
        return jsonDecode(response.body);
    }
}