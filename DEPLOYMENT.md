# Deployment (EKS)
The following steps are for deploying the application to the UAT EKS cluster. Under the namespace `uat`.

## Preface
- The application is deployed by hand, if you are reading this, and you think it is not the right way, dun hesitate to build a CI/CD pipeline!
- The deployment is on EKS
  - You may wonder why are we using EKS when trinity is on ECS. The reason is atm adding a new service to the EKS cluster is easier then adding to ECS cluster.

## Details 
- cluster `staging`
- namespace `uat`
- ingress `ingress-api`
  - the ingress was manually updated to point to the new service, so you will not see the ingress.yaml file in the k8s directory.
- secrets are managed by hand, so no need to update the `k8s/secret.yaml`. Can directly use the secret created in the `staging` cluster.

## Prerequisites
- Docker
- ECR EKS Access
- yq

## Steps
### Login to ECR
1. `ECR_PASSWORD=$(aws ecr get-login-password --region ap-southeast-1)`
2. `echo $ECR_PASSWORD | docker login --username AWS --password-stdin 938897780349.dkr.ecr.ap-southeast-1.amazonaws.com`

### Redeploy k8s pod
1. `export VERSION=$(date +%s)`
2. `docker build --platform="linux/amd64" -t rota:$VERSION .`
3. `export IMAGE=938897780349.dkr.ecr.ap-southeast-1.amazonaws.com/rota:$VERSION`
3. `docker tag rota:$VERSION $IMAGE`
4. `docker push $IMAGE`
5. `yq -i ".spec.template.spec.containers[0].image = \"$IMAGE\"" k8s/deployment.yaml`
6. `kubectl apply -f k8s/deployment.yaml -n uat`

# Update secret
## Prerequisites
- EKS Access

## Steps
1. `kubectl edit secret rota-secret -n uat`
2. `kubectl rollout restart deployment rota -n uat`


