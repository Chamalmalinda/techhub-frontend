import { useState } from "react";
import Modal from "react-modal";

export default function ViewOrderInfoCustomer(props) {
	const order = props.order;
	const [isModalOpen, setIsModalOpen] = useState(false);

	if (!order) return null;

	const formatDateTime = (value) => {
		if (!value) return "-";
		const d = new Date(value);
		return d.toLocaleString();
	};

	const formatCurrency = (value) => {
		if (value == null) return "-";
		return `Rs. ${Number(value).toFixed(2)}`;
	};

	const getStatusBadgeClasses = (status) => {
		switch (status?.toLowerCase()) {
			case "completed":
			case "paid":
				return "bg-green-100 text-green-800 border border-green-300";
			case "cancelled":
			case "canceled":
				return "bg-red-100 text-red-800 border border-red-300";
			case "processing":
				return "bg-purple-100 text-purple-800 border border-purple-300";
			default:
	
				return "bg-orange-100 text-orange-800 border border-orange-300";
		}
	};

	const orderTotalFromItems =
		Array.isArray(order.items) && order.items.length > 0
			? order.items.reduce(
					(sum, item) => sum + (item.price || 0) * (item.quantity || 0),
					0
			  )
			: order.total;

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				ariaHideApp={false}
				overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
				className="w-full max-w-4xl bg-white rounded-xl sm:rounded-xl shadow-2xl outline-none overflow-hidden"
			>
				<div className="flex flex-col h-full max-h-[95vh] sm:max-h-[90vh]">
					{/* Header */}
					<div className="flex items-start justify-between border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-accent via-accent to-accent gap-4">
						<div className="min-w-0">
							<h2 className="text-2xl sm:text-3xl font-bold text-white break-words">
								Order Details
							</h2>
							<p className="text-xs sm:text-sm text-cyan-100 mt-1 sm:mt-2">
								Complete order information and breakdown
							</p>
						</div>
						<button
							onClick={() => setIsModalOpen(false)}
							className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 flex-shrink-0"
							aria-label="Close"
						>
							<span className="text-2xl leading-none">&times;</span>
						</button>
					</div>

		
					<div className="px-4 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 overflow-y-auto bg-white">
				
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
					
							<div className="space-y-3 sm:space-y-4">
					
								<div className="bg-gradient-to-br from-cyan-50 to-white border border-cyan-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
									<p className="text-xs font-semibold tracking-widest text-cyan-700 uppercase">
										Order ID
									</p>
									<p className="text-base sm:text-lg font-bold text-cyan-900 mt-2 break-all">
										{order.orderId}
									</p>
								</div>

						
								<div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
									<p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
										Customer Name
									</p>
									<p className="text-base sm:text-lg font-semibold text-emerald-900 mt-2 break-words">
										{order.name}
									</p>
								</div>

								<div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
									<p className="text-xs font-semibold tracking-widest text-blue-700 uppercase">
										Email
									</p>
									<p className="text-xs sm:text-sm text-blue-900 mt-2 break-all font-medium">
										{order.email}
									</p>
								</div>

						
								{order.phone && (
									<div className="bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
										<p className="text-xs font-semibold tracking-widest text-pink-700 uppercase">
											Phone
										</p>
										<p className="text-base sm:text-lg font-semibold text-pink-900 mt-2 break-all">
											{order.phone}
										</p>
									</div>
								)}
							</div>

						
							<div className="space-y-3 sm:space-y-4">
							
								<div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
									<p className="text-xs font-semibold tracking-widest text-amber-700 uppercase">
										Order Date & Time
									</p>
									<p className="text-xs sm:text-sm text-amber-900 mt-2 font-medium">
										{formatDateTime(order.date)}
									</p>
								</div>

							
								<div className="bg-gradient-to-br from-rose-50 to-white border border-rose-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
									<p className="text-xs font-semibold tracking-widest text-rose-700 uppercase mb-3">
										Order Status
									</p>
									<div className="flex items-center gap-3">
										<span
											className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${getStatusBadgeClasses(
												order.status
											)}`}
										>
											<span className="w-2 h-2 rounded-full bg-current mr-2" />
											{order.status || "pending"}
										</span>
									</div>
								</div>

								{/* Total Amount */}
								<div className="bg-gradient-to-br from-teal-50 to-white border border-teal-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
									<p className="text-xs font-semibold tracking-widest text-teal-700 uppercase">
										Total Amount
									</p>
									<p className="text-xl sm:text-2xl font-black text-teal-900 mt-2 break-all">
										{formatCurrency(order.total ?? orderTotalFromItems)}
									</p>
									{order.total != null &&
										orderTotalFromItems != null &&
										Number(order.total) !== Number(orderTotalFromItems) && (
											<p className="text-xs text-teal-600 mt-2">
												Calculated: <span className="font-semibold text-teal-800">
													{formatCurrency(orderTotalFromItems)}
												</span>
											</p>
										)}
								</div>
							</div>
						</div>

						<div className="border-2 border-indigo-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 bg-gradient-to-br from-indigo-50 to-white hover:shadow-md transition-shadow duration-200">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
									<svg className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
								</div>
								<p className="text-xs sm:text-sm font-bold text-indigo-900 uppercase tracking-wide">
									Delivery Address
								</p>
							</div>
							<p className="text-xs sm:text-sm text-indigo-800 whitespace-pre-line leading-relaxed ml-11 sm:ml-13">
								{order.address}
							</p>
						</div>


						<div className="border-2 border-lime-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 bg-gradient-to-br from-lime-50 to-white hover:shadow-md transition-shadow duration-200">
							<div className="flex items-center gap-3 mb-3 sm:mb-4">
								<div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-lime-100 flex items-center justify-center flex-shrink-0">
									<svg className="w-4 sm:w-5 h-4 sm:h-5 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
								</div>
								<p className="text-xs sm:text-sm font-bold text-lime-900 uppercase tracking-wide">
									Additional Notes
								</p>
							</div>
							<textarea
								className="text-xs sm:text-sm text-lime-900 whitespace-pre-line w-full outline-0 bg-white rounded-lg sm:rounded-xl border border-lime-200 p-2 sm:p-3 focus:border-lime-400 transition-colors duration-200"
								value={order.notes || "No additional notes provided."}
								disabled
								rows="4"
							></textarea>
						</div>

			
						<div className="border-2 border-sky-200 rounded-xl sm:rounded-2xl bg-white overflow-hidden hover:shadow-md transition-shadow duration-200">
							<div className="flex items-center justify-between flex-wrap gap-2 px-4 sm:px-5 py-3 sm:py-4 border-b-2 border-sky-200 bg-gradient-to-r from-sky-50 to-sky-50">
								<div className="flex items-center gap-3 min-w-0">
									<div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
										<svg className="w-4 sm:w-5 h-4 sm:h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
										</svg>
									</div>
									<p className="text-xs sm:text-sm font-bold text-sky-900 uppercase truncate">
										Items in this order
									</p>
								</div>
								<p className="text-xs font-semibold text-sky-700 bg-sky-100 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
									{order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
								</p>
							</div>

							{Array.isArray(order.items) && order.items.length > 0 ? (
								<div className="max-h-64 sm:max-h-72 overflow-y-auto divide-y divide-sky-100">
									{order.items.map((item, index) => {
										const lineTotal = (item.price || 0) * (item.quantity || 0);
										return (
											<div
												key={`${item.productID}-${index}`}
												className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 hover:bg-sky-50 transition-colors duration-200"
											>
												
												<div className="flex-shrink-0">
													<div className="w-12 sm:w-16 h-12 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden bg-sky-100 flex items-center justify-center border border-sky-200 hover:border-sky-400 transition-colors duration-200">
														{item.image ? (
															<img
																src={item.image}
																alt={item.name}
																className="w-full h-full object-cover"
															/>
														) : (
															<span className="text-xs text-sky-600 font-medium text-center px-1">
																No image
															</span>
														)}
													</div>
												</div>

											
												<div className="flex-1 min-w-0">
													<p className="text-xs sm:text-sm font-bold text-sky-900 truncate">
														{item.name}
													</p>
													<p className="text-xs text-sky-700 mt-1">
														ID: <span className="font-semibold text-sky-800 break-all">{item.productID}</span>
													</p>
													<div className="flex gap-2 sm:gap-4 mt-1 sm:mt-2 text-xs flex-wrap">
														<p className="text-sky-700">
															Qty: <span className="font-bold text-sky-900">{item.quantity}</span>
														</p>
														<span className="text-sky-400 hidden sm:inline">•</span>
														<p className="text-sky-700">
															Price: <span className="font-bold text-sky-900">{formatCurrency(item.price)}</span>
														</p>
													</div>
												</div>

											
												<div className="flex-shrink-0 text-right">
													<p className="text-xs sm:text-sm font-black text-sky-900 bg-sky-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-sky-200 whitespace-nowrap">
														{formatCurrency(lineTotal)}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<div className="px-4 sm:px-5 py-6 sm:py-8 text-center text-xs sm:text-sm text-sky-700 font-medium">
									No items found for this order.
								</div>
							)}
						</div>
					</div>
				</div>
			</Modal>

			<button
				className="bg-accent hover:bg-cyan-400 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-white cursor-pointer text-xs sm:text-sm font-bold shadow-md shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-200"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				View Info
			</button>
		</>
	);
}