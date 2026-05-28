import { cn } from "@/lib/utils";
import { XIcon } from "@/components/x-icon";
import { Button } from "@/components/ui/button";
import { Mail, Users } from "lucide-react";

const APP_EMAIL = "sanketxcodes@gmail.com";

const data = [
	{
		title: "Email Us",
		description: "We respond to all emails within 24 hours.",
		icon: (
			<Mail />
		),
		href: `mailto:${APP_EMAIL}`,
		label: APP_EMAIL,
	},
	{
		title: "Send us DM",
		description: "Send us a direct message on X for quick answers.",
		icon: <XIcon />,
		href: "https://x.com/SinghSanket78",
		label: "@SinghSanket78",
	},
	{
		title: "Join the community",
		description: "Join our community to connect with other users.",
		icon: (
			<Users />
		),
		href: "#",
		label: "Join Discord",
	},
];

export function Contact() {
	return (
		<div className="mx-auto max-w-4xl">
			<div className="mb-12 flex max-w-md flex-col justify-center gap-2">
				<h1 className="font-bold text-2xl md:text-3xl">Contact Us</h1>
				<p className="text-base text-muted-foreground">
					We&apos;re here to help and answer any question you might have, We
					look forward to hearing from you.
				</p>
			</div>
			<div
				className="grid gap-1 overflow-hidden rounded-lg bg-muted p-0.5 md:grid-cols-3 dark:bg-muted/50">
				{data.map((item) => (
					<div
						className="flex flex-col gap-3 rounded-lg bg-background px-6 py-6 shadow-xs border"
						key={item.title}>
						<div
							className={cn(
								"flex items-center gap-x-2",
								"[&_svg]:size-4 [&_svg]:text-muted-foreground"
							)}>
							{item.icon}
							<h2 className="text-sm">{item.title}</h2>
						</div>
						<p className="text-muted-foreground text-sm">{item.description}</p>
						<div className="mt-1 flex items-center gap-x-2">
							<Button asChild variant="link">
								<a href={item.href} target="_blank">{item.label}</a>
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
