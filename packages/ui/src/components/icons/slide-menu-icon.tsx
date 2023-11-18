/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const SlideMenuIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				d="M6.75 5.5H17.25V4H6.75V5.5ZM18.5 6.75V17.25H20V6.75H18.5ZM17.25 18.5H6.75V20H17.25V18.5ZM5.5 17.25V6.75H4V17.25H5.5ZM6.75 18.5C6.05964 18.5 5.5 17.9404 5.5 17.25H4C4 18.7688 5.23122 20 6.75 20V18.5ZM18.5 17.25C18.5 17.9404 17.9404 18.5 17.25 18.5V20C18.7688 20 20 18.7688 20 17.25H18.5ZM17.25 5.5C17.9404 5.5 18.5 6.05964 18.5 6.75H20C20 5.23122 18.7688 4 17.25 4V5.5ZM6.75 4C5.23122 4 4 5.23122 4 6.75H5.5C5.5 6.05964 6.05964 5.5 6.75 5.5V4Z"
				fill={color}
			/>
			<path
				d="M8.75 8.5H10.25V7H8.75V8.5ZM10.5 8.75V15.25H12V8.75H10.5ZM10.25 15.5H8.75V17H10.25V15.5ZM8.5 15.25V8.75H7V15.25H8.5ZM8.75 15.5C8.61193 15.5 8.5 15.3881 8.5 15.25H7C7 16.2165 7.7835 17 8.75 17V15.5ZM10.5 15.25C10.5 15.3881 10.3881 15.5 10.25 15.5V17C11.2165 17 12 16.2165 12 15.25H10.5ZM10.25 8.5C10.3881 8.5 10.5 8.61193 10.5 8.75H12C12 7.7835 11.2165 7 10.25 7V8.5ZM8.75 7C7.7835 7 7 7.7835 7 8.75H8.5C8.5 8.61193 8.61193 8.5 8.75 8.5V7Z"
				fill={color}
			/>
		</svg>
	),
)

export default SlideMenuIcon
