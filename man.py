import sys
import os
import man_util as utils


# Main command handler
def command_handler(fun_map):
    if len(sys.argv) > 1:
        f = fun_map.get(sys.argv[1])
        if f:
            f(sys.argv[2:])
        else:
            print("[!] Unknown command!")
            sys.exit(1)

# Test function
def test(arg_list):
    print(arg_list)
    
# Page command handler    
def page(arg_list):
    action = arg_list[0]
    
    if action == 'new':
        utils.create_page(arg_list[1])

fun_map = {
    'test':test,
    'page':page
}

command_handler(fun_map)