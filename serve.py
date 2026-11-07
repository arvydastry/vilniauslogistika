#!/usr/bin/env python3
"""Peržiūros serveris su gijomis. Naudojimas: python3 serve.py [portas]"""
import os, sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
os.chdir(os.path.dirname(os.path.abspath(__file__)))
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8150
class H(SimpleHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'
    def log_message(self, *a): pass
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache'); super().end_headers()
srv = ThreadingHTTPServer(('', port), H); srv.request_queue_size = 64
print(f'http://localhost:{port}/'); srv.serve_forever()
