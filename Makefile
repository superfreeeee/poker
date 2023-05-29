reinstall: clean-deps
	pnpm i

############### cleans ###############
clean-deps:
# remove root node_modules
	rm -r node_modules || true
# remove apps node_modules
	find apps -iname 'node_modules' | xargs rm -r

clean-build:
	echo 'TODO clean-build'

build-pc:
	@echo "========================================"
	@echo ">>>>>   build-pc"
	@echo "========================================"
	pnpm build:pc

upload-pc:
	@echo "========================================"
	@echo ">>>>>   upload-pc"
	@echo "========================================"
	scp -r apps/pc/dist/ root@remote:/root/poker-dist/fe/
	scp -r apps/pc/deploy/* root@remote:/root/poker-dist/fe/

deploy-pc: build-pc upload-pc remote-restart

remote-restart:
	@echo "========================================"
	@echo ">>>>>   remote-restart"
	@echo "========================================"
	ssh root@remote "cd /root/poker-dist/fe; docker-compose down; docker-compose up -d; docker-compose ps"
