import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, useGLTF, OrbitControls, useTexture, Loader } from '@react-three/drei';
import * as THREE from 'three';
import m3d from 'assets/3d-models/moi_mem.glb';
import whiteImg from 'assets/images/white-img.jpg';
import 'assets/scss/scss-pages/customize-lure.scss';
import TabSelectCustomize from 'components/tab-select-customize/TabSelectCustomize';
import { useDispatch, useSelector } from 'react-redux';
import { getMaterialsInfoBy, getNodesInfoBy, getMaterialsName, getColorMaterialByName } from 'utils/product';
import { setListName } from 'redux/action/customize-info';
import { setMaterialId } from 'redux/action/customize-id';

function Shoe(props) {
	const ref = useRef();
	const dispatch = props.dispatch;

	let customizeInfo = props.customizeInfo;

	//Load 3d model
	const { nodes, materials } = useGLTF(m3d);

	let listNodes = getNodesInfoBy(nodes, 'Mesh');
	let listMaterials = getMaterialsInfoBy(materials, 'MeshStandardMaterial');
	let listMaterialsName = getMaterialsName(materials, 'MeshStandardMaterial');
	useEffect(() => {
		const action = setListName(listMaterialsName);
		dispatch(action);
	}, []);

	let listTextures = [];
	let texture0 = useTexture(
		customizeInfo.length > 0 && customizeInfo[0].img !== '' ? customizeInfo[0].img : whiteImg
	);
	let texture1 = useTexture(
		customizeInfo.length > 1 && customizeInfo[1].img !== '' ? customizeInfo[1].img : whiteImg
	);
	let texture2 = useTexture(
		customizeInfo.length > 2 && customizeInfo[2].img !== '' ? customizeInfo[2].img : whiteImg
	);
	let texture3 = useTexture(
		customizeInfo.length > 3 && customizeInfo[3].img !== '' ? customizeInfo[3].img : whiteImg
	);
	let texture4 = useTexture(
		customizeInfo.length > 4 && customizeInfo[4].img !== '' ? customizeInfo[4].img : whiteImg
	);
	let texture5 = useTexture(
		customizeInfo.length > 5 && customizeInfo[5].img !== '' ? customizeInfo[5].img : whiteImg
	);
	let texture6 = useTexture(
		customizeInfo.length > 6 && customizeInfo[6].img !== '' ? customizeInfo[6].img : whiteImg
	);
	let texture7 = useTexture(
		customizeInfo.length > 7 && customizeInfo[7].img !== '' ? customizeInfo[7].img : whiteImg
	);

	listTextures.push(texture0, texture1, texture2, texture3, texture4, texture5, texture6, texture7);

	// 	texture.wrapS = THREE.RepeatWrapping;
	// 	texture.wrapT = THREE.RepeatWrapping;
	// 	texture.repeat.set(1, 1);

	// Animate model
	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
		ref.current.rotation.x = Math.cos(t / 4) / 8;
		ref.current.rotation.y = Math.sin(t / 4) / 8;
		ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
	});

	// Cursor showing current color
	const [hovered, setHovered] = useState(null);
	useEffect(() => {
		const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${getColorMaterialByName(
			customizeInfo,
			hovered
		)}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
		const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
		document.getElementById('customize-lure').style.cursor = `url('data:image/svg+xml;base64,${btoa(
			hovered ? cursor : auto
		)}'), auto`;
	}, [hovered]);

	// Using the GLTFJSX output here to wire in app-state and hook up events
	return (
		<group
			ref={ref}
			dispose={null}
			onPointerOver={(e) => {
				e.stopPropagation();
				console.log(e.object);
				setHovered(e.object.material.name);
			}}
			onPointerOut={(e) => e.intersections.length === 0 && setHovered(null)}
			onPointerMissed={() => {
				setHovered(null);
			}}
			onPointerDown={(e) => {
				e.stopPropagation();
			}}
		>
			{listNodes.length > 0 &&
				listNodes.map((item, i) => (
					<mesh
						key={i}
						receiveShadow
						castShadow
						geometry={item.geometry}
						material={listMaterials[i].mesh}
						material-map={listTextures[i]}
						material-color={customizeInfo.length > 0 ? customizeInfo[i].color : '#ffffff'}
					/>
				))}
		</group>
	);
}

function CanvasModel(props) {
	return (
		<div className="customize">
			<Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }} id="customize-lure">
				<ambientLight intensity={0.7} />
				<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
				<Suspense fallback={null}>
					<Shoe dispatch={props.dispatch} customizeInfo={props.customizeInfo} />
					<Environment preset="city" />
					<ContactShadows
						rotation-x={Math.PI / 2}
						position={[0, -0.8, 0]}
						opacity={0.25}
						width={10}
						height={10}
						blur={1.5}
						far={0.8}
					/>
				</Suspense>
				<OrbitControls />
			</Canvas>
			<Loader />
			<ListActionMaterials dispatch={props.dispatch} mId={props.mId} customizeInfo={props.customizeInfo} />
		</div>
	);
}

function ListActionMaterials(props) {
	const { dispatch, customizeInfo, mId } = props;
	function handleChangeMId(mId) {
		const action = setMaterialId(mId);
		dispatch(action);
	}
	return (
		<div className="list-group picker">
			{customizeInfo.length > 0 &&
				customizeInfo.map((item, i) => (
					<a
						onClick={() => handleChangeMId(item.id)}
						key={i}
						className={`list-group-item list-group-item-action pointer ${
							mId === item.id ? 'list-group-active' : ''
						}`}
					>
						{item.name}
					</a>
				))}
		</div>
	);
}

export default function Customize() {
	const customizeInfo = useSelector((state) => state.customizeInfo);
	const mId = useSelector((state) => state.customizeId);
	const dispatch = useDispatch();

	return (
		<div className="row">
			<div className="col-md-3">
				<TabSelectCustomize />
			</div>
			<div className="col-md-9">
				<CanvasModel dispatch={dispatch} mId={mId} customizeInfo={customizeInfo} />
			</div>
		</div>
	);
}
