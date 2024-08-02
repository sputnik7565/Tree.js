import './style.css'
import * as THREE from 'three'

// App 클래스 정의
class App{

  // 렌더러 생성
  private renderer: THREE.WebGLRenderer
  
  // id 가 app 인 div를 참조하는 DOM 객체 생성
  private domApp: Element

  // scene 객체 생성
  private scene: THREE.Scene

  // 카메라, 광원, 모델을 참조하기 위한 필드 생성
  private camera?: THREE.PerspectiveCamera // ? 는 PerspectiveCamera 객체나 Undefine 객체를 가질 수 있게 함

  // cube 를 추가
  private cube?: THREE.Mesh


  constructor(){
    console.log('Hello three.js')
    this.renderer = new THREE.WebGLRenderer({ antialias: true}) //antialias 계단 현상 방지
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio)) //현재 모니터의 픽셀 비율을 가져옴, 팍셀 비율을 2로 설정

    this.domApp = document.querySelector('#app')! //!는 쿼리셀렉터의 발언값이 Null이 아닐때만 적용
    this.domApp.appendChild(this.renderer.domElement) // canvas 타입의 돔 객체

    this.scene = new THREE.Scene() //scene 객체

    // 카메라, 광원, 모델 객체
    this.setupCamera()
    this.setupLight()
    this.setupModels()

    // 객체의 이벤트
    this.setupEvents()
  }

  private setupCamera(){
    // 카메라의 렌더링 비율을 얻기 위해 domApp 객체의 가로 세로 값을 가져옴
    const width = this.domApp.clientWidth
    const height = this.domApp.clientHeight

    // 카메라 객체 생성
    this.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 100)

    // 카메라 위치
    this.camera.position.z = 2 // 카메라의 위치 x,y,z 는 0, 0, 2 로 세팅

  }

  private setupLight(){
    // 광원 세팅
    const color = 0xffffff //색상
    const intensity = 1 //강도
    const light = new THREE.DirectionalLight(color, intensity)
    const light_2 = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4) //위치
    light_2.position.set(2,-4,-4)

    this.scene.add(light, light_2) // scene 에 광원 추가
  }

  private setupModels(){
    // 모델은 Geometry 와 Material 로 구성
    const geometry = new THREE.BoxGeometry(1,1,1) // 정육면체 모양의 박스
    const material = new THREE.MeshPhongMaterial({color: 0xf1c40f}) // 재질과 컬러 

    // 모델 생성
    this.cube = new THREE.Mesh(geometry, material) // 모델은 Three.js에서 Mesh 클래스로 나타냄

    // cube를 scene 에 자식으로 추가
    this.scene.add(this.cube)

  }

  private setupEvents(){
    window.onresize = this.resize.bind(this) // 브라우저의 크기가 변경될 때 사이즈 변경
    this.resize() // 첫 실행 시 리사이즈 실행

    // render 실행
    this.renderer.setAnimationLoop(this.render.bind(this))

  }

  private resize(){
    const width = this.domApp.clientWidth
    const height = this.domApp.clientHeight

    const camera = this.camera
    if(camera){
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    this.renderer.setSize(width,height)
  }

  // 모델 객체의 애니메니션 정의
  private update(time: number){ // time 인자 값은 애니메이션 기능을 추가할 때 중요한 요소
    time *= 0.001 // time 인자는 원래 밀리세컨드 단위라서 세컨드 단위로 변경

    const cube = this.cube
    if(cube){
      cube.rotation.x = time
      cube.rotation.y = time
    }
  }  

  // 렌더링을 위한 메서드
  private render(time: number){

    this.update(time) // 모델의 애니메이션 호출
    this.renderer.render(this.scene, this.camera!) // 렌더러 객체에 랜더 메서드를 호출해서 랜더링
  }

}



// App 클래스 생성
new App()