#!/usr/bin/env python3
"""
Servidor Python para compilar e executar código Java
Usado pelo WebJDK para executar Java de forma real
"""

import http.server
import json
import os
import subprocess
import tempfile
import shutil
from pathlib import Path
from urllib.parse import urlparse, parse_qs

class JavaCompilerHandler(http.server.BaseHTTPRequestHandler):
    """Handler para requisições de compilação e execução Java"""
    
    def do_POST(self):
        """Handle POST requests"""
        
        # CORS headers
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        try:
            # Ler o corpo da requisição
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            request_data = json.loads(body.decode('utf-8'))
            
            code = request_data.get('code', '')
            stdin = request_data.get('stdin', '')
            
            if not code:
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': ['Nenhum código fornecido'],
                    'exitCode': 1,
                    'output': [],
                    'stderr': []
                }).encode('utf-8'))
                return
            
            # Compilar e executar
            result = self.compile_and_run(code, stdin)
            self.wfile.write(json.dumps(result).encode('utf-8'))
            
        except Exception as e:
            self.wfile.write(json.dumps({
                'success': False,
                'error': [f'Erro do servidor: {str(e)}'],
                'exitCode': 1,
                'output': [],
                'stderr': []
            }).encode('utf-8'))
    
    def do_OPTIONS(self):
        """Handle OPTIONS requests (CORS preflight)"""
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Max-Age', '3600')
        self.end_headers()
        self.wfile.write(b'{}')
    
    def do_GET(self):
        """Handle GET requests (health check)"""
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({'status': 'ok', 'version': '1.0'}).encode('utf-8'))
    
    def compile_and_run(self, code, stdin):
        """Compilar e executar código Java"""
        
        # Criar diretório temporário
        temp_dir = tempfile.mkdtemp(prefix='webjdk_')
        
        try:
            # Escrever arquivo Java
            java_file = os.path.join(temp_dir, 'Main.java')
            with open(java_file, 'w', encoding='utf-8') as f:
                f.write(code)
            
            # Compilar
            compile_result = subprocess.run(
                ['javac', java_file],
                cwd=temp_dir,
                capture_output=True,
                text=True,
                timeout=10
            )
            
            if compile_result.returncode != 0:
                return {
                    'success': False,
                    'error': ['Erro durante compilação (javac exit code: 1)'],
                    'exitCode': compile_result.returncode,
                    'output': [],
                    'stderr': compile_result.stderr.split('\n') if compile_result.stderr else []
                }
            
            # Executar
            run_result = subprocess.run(
                ['java', '-cp', temp_dir, 'Main'],
                cwd=temp_dir,
                capture_output=True,
                text=True,
                input=stdin,
                timeout=10
            )
            
            # Processar output
            output_lines = run_result.stdout.split('\n') if run_result.stdout else []
            error_lines = run_result.stderr.split('\n') if run_result.stderr else []
            
            # Remover linhas vazias finais
            while output_lines and output_lines[-1] == '':
                output_lines.pop()
            while error_lines and error_lines[-1] == '':
                error_lines.pop()
            
            return {
                'success': run_result.returncode == 0,
                'error': error_lines if run_result.returncode != 0 else [],
                'exitCode': run_result.returncode,
                'output': output_lines,
                'stderr': error_lines
            }
            
        except subprocess.TimeoutExpired:
            return {
                'success': False,
                'error': ['Timeout - execução demorou muito'],
                'exitCode': 124,
                'output': [],
                'stderr': []
            }
        except Exception as e:
            return {
                'success': False,
                'error': [f'Erro: {str(e)}'],
                'exitCode': 1,
                'output': [],
                'stderr': []
            }
        finally:
            # Limpar diretório temporário
            try:
                shutil.rmtree(temp_dir)
            except:
                pass
    
    def log_message(self, format, *args):
        """Reduzir verbosidade de logs"""
        if '/compile' in args[0]:
            return
        super().log_message(format, *args)


def run_server(port=8888):
    """Executar servidor"""
    server_address = ('', port)
    httpd = http.server.HTTPServer(server_address, JavaCompilerHandler)
    print(f'🚀 Servidor Java compilador rodando em http://localhost:{port}')
    print('Pressione Ctrl+C para parar')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n⛔ Servidor parado')
        httpd.shutdown()


if __name__ == '__main__':
    run_server()
